<?php

namespace App\Controller;

use App\Entity\User;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Mailer\MailerInterface;
class UserController extends AbstractController
{
    private SerializerInterface $serializer;
    private EntityManagerInterface $entityManager;

    public function __construct(SerializerInterface $serializer, EntityManagerInterface $entityManager)
    {
        $this->serializer = $serializer;
        $this->entityManager = $entityManager;
    }

    #[Route('/api/users/{id}', name: 'app_user_by_id', methods: ['GET'])]
    public function __invoke(int $id): Response
    {
        $user = $this->getUser();

        if (!$user) {
            throw $this->createNotFoundException('Utilisateur non trouvé');
        }

        $userData = [
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
            'email' => $user->getEmail(),
            'profilePicture' => $user->getProfilePicture(),
        ];

        $jsonResponse = $this->serializer->serialize($userData, 'json', [
            'groups' => ['read'],
        ]);

        return new Response($jsonResponse, 200, [
            'Content-Type' => 'application/json',
        ]);
    }

    #[Route('/api/create/users', name: 'create_user', methods: ['POST'])]
    public function create(Request $request, ValidatorInterface $validator, MailerInterface $mailer): Response
    {
        $data = json_decode($request->getContent(), true);

        $user = new User();
        $dateOfBirth = DateTime::createFromFormat('d/m/Y', $data['dateOfBirth']);

        $date13YearsAgo = (new DateTime())->modify('-13 years');

        if ($dateOfBirth > $date13YearsAgo) {
            return new Response('User must be at least 13 years old', Response::HTTP_BAD_REQUEST);
        }

        $rawSql = "SELECT * FROM user WHERE username = :username OR email = :email";

        $stmt = $this->entityManager->getConnection()->prepare($rawSql);
        $result = $stmt->executeQuery(['username' => $data['username'], 'email' => $data['email']]);
        $checkIfUserAlreadyExist = $result->fetchOne();

        if ($checkIfUserAlreadyExist) {
            return new Response('Username or Email already exists', Response::HTTP_CONFLICT);
        }

        $user->setUsername($data['username']);
        $user->setPassword($data['password']);
        $user->setEmail($data['email']);
        $user->setFirstName($data['firstName']);
        $user->setLastName($data['lastName']);
        $user->setDateOfBirth($dateOfBirth);
        $user->setCreatedAt(new \DateTimeImmutable());
        $user->setRoles(['ROLE_USER']);

        $errors = $validator->validate($user, null, ['Default', 'write']);

        if (count($errors) > 0) {
            $errorsString = (string)$errors;

            return new Response($errorsString, Response::HTTP_BAD_REQUEST);
        }

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $email = (new Email())
            ->from('noreply@yourwebsite.com')
            ->to($user->getEmail())
            ->subject('Welcome to our website')
            ->text(
                "Bonjour " . $user->getFirstName() . ",\n\n" .
                "Merci pour votre inscription au meilleur réseau philosique depuis Platon\n\n" .
                "Bonne réflexion,\n" .
                "Team Aristote"
            );

        $mailer->send($email);

        return new Response('User created', Response::HTTP_CREATED);
    }

    #[Route('/api/users/{id}', name: 'update_user', methods: ['PUT'])]
    public function update(Request $request, User $user, JWTTokenManagerInterface $JWTManager): Response
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['username'])) {
            $user->setUsername($data['username']);
        }

        if (isset($data['first_name'])) {
            $user->setFirstName($data['first_name']);
        }

        if (isset($data['last_name'])) {
            $user->setLastName($data['last_name']);
        }

        if (isset($data['email'])) {
            $user->setEmail($data['email']);
        }

        if (isset($data['password'])) {
            $user->setPassword($data['password']);
        }

        $user->setUpdatedAt(new \DateTimeImmutable());

        $this->entityManager->persist($user);
        $uow = $this->entityManager->getUnitOfWork();
        $uow->computeChangeSets();
        $changeset = $uow->getEntityChangeSet($user);
        $this->entityManager->flush();

        $token = $JWTManager->create($user);

        $jsonResponse = $this->serializer->serialize($user, 'json', [
            'groups' => ['read'],
        ]);

        return new Response($jsonResponse, Response::HTTP_OK, [
            'Content-Type' => 'application/json',
        ]);
    }
}
