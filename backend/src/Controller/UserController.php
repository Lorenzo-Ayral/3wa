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
}
