<?php

namespace App\Controller;

use App\Entity\User;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

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
    public function create(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $rawSql = "SELECT * FROM user WHERE username = :username OR email = :email";

        $stmt = $this->entityManager->getConnection()->prepare($rawSql);
        $result = $stmt->executeQuery(['username' => $data['username'], 'email' => $data['email']]);

        $checkIfUserAlreadyExist = $result->fetchOne();

        if ($checkIfUserAlreadyExist) {
            return new Response('Username or Email already exists', Response::HTTP_CONFLICT);
        }

        $user = new User();
        $dateOfBirth = DateTime::createFromFormat('d/m/Y', $data['dateOfBirth']);

        $user->setUsername($data['username']);
        $user->setPassword($data['password']);
        $user->setEmail($data['email']);
        $user->setFirstName($data['firstName']);
        $user->setLastName($data['lastName']);
        $user->setDateOfBirth($dateOfBirth);
//        $user->setProfilePicture($data['profilePicture']);
        $user->setCreatedAt(new \DateTimeImmutable());
        $user->setRoles(['ROLE_USER']);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new Response('User created', Response::HTTP_CREATED);
    }

//    #[Route('/api/users/{id}', name: 'update_user', methods: ['PATCH'])]
//    public function update(Request $request, User $user): Response
//    {
//        $data = json_decode($request->getContent(), true);
//        echo $data;
//
//        if (isset($data['username'])) {
//            $user->setUsername($data['username']);
//        }
//
//        if (isset($data['first_name'])) {
//            $user->setFirstName($data['first_name']);
//        }
//
//        if (isset($data['last_name'])) {
//            $user->setLastName($data['last_name']);
//        }
//
//        if (isset($data['email'])) {
//            $user->setEmail($data['email']);
//        }
//
//        if (isset($data['password'])) {
//            $user->setPassword($data['password']);
//        }
//
//        $user->setUpdatedAt(new \DateTimeImmutable());
//
//        $this->entityManager->persist($user);
//        $this->entityManager->flush();
//
//        return $this->json($user, Response::HTTP_OK);
//    }

}
