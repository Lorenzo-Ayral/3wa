<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('api/users/{id}', name: 'app_user_by_id', methods: ['GET'])]
    public function showProfile(): Response
    {

        $user = $this->getUser();
        var_dump('Je suis dans la méthode index du contrôleur UserController.');
        dd($user);

        if (!$user) {
            throw $this->createNotFoundException('Utilisateur non trouvé');
        }
        return $this->json($user, 200, [], ['groups' => 'read']);
    }
}
