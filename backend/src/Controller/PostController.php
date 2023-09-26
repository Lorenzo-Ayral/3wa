<?php

namespace App\Controller;

use App\Entity\Post;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PostController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/posts', name: 'create_post', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $content = $data['content'];
        $authorId = $data['author'];


        $post = new Post();
        $post->setAuthor($authorId);
        $post->setContent($content);

        $this->entityManager->persist($post);
        $this->entityManager->flush();

        return $this->json($post, Response::HTTP_CREATED);
    }

    #[Route('/api/posts', name: 'get_posts', methods: ['GET'])]
    public function index(): Response
    {
        $posts = $this->entityManager->getRepository(Post::class)->findAll();

        $postsData = [];
        foreach ($posts as $post) {
            $postData = [
                'id' => $post->getId(),
                'content' => $post->getContent(),
                'author' => $post->getAuthor()->getUsername(),
                'created_at' => $post->getCreatedAt(),
            ];
            $postsData[] = $postData;
        }

        return $this->json($postsData);
    }
}