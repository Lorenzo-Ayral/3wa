<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\User;
use App\Service\FileUploader;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PostController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private FileUploader $fileUploader;

    public function __construct(
        EntityManagerInterface $entityManager, FileUploader $fileUploader
    )
    {
        $this->entityManager = $entityManager;
        $this->fileUploader = $fileUploader;
    }

    #[Route('/api/posts', name: 'create_post', requirements: ['_format' => 'json'], methods: ['POST'])]
    public function __invoke(Request $request, FileUploader $fileUploader): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['content']) || !isset($data['author'])) {
            return $this->json(['message' => 'Les données JSON sont incorrectes.'], Response::HTTP_BAD_REQUEST);
        }

        $content = $data['content'];
        $authorPath = $data['author'];

        $parts = explode('/', $authorPath);
        $userId = end($parts);

        $userRepository = $this->entityManager->getRepository(User::class);
        $author = $userRepository->find($userId);

        if (!$author) {
            return $this->json(['message' => 'Utilisateur non trouvé.'], Response::HTTP_NOT_FOUND);
        }

        $post = new Post();
        $post->setAuthor($author);
        $post->setContent($content);

        $pictureBase64 = $data['picture'];

        if ($pictureBase64) {
            $tempFileName = tempnam(sys_get_temp_dir(), 'image_');
            file_put_contents($tempFileName, base64_decode($pictureBase64));

            $originalFilename = pathinfo($tempFileName, PATHINFO_FILENAME);
            $extension = pathinfo($tempFileName, PATHINFO_EXTENSION);
            $fileName = $originalFilename . '-' . uniqid() . '.' . $extension;

            $file = new UploadedFile(
                $tempFileName,
                $fileName,
                'image/' . $extension,
                null,
                true, // $test
                true  // $error
            );

            $fileName = $fileUploader->upload($file);

            if ($fileName) {
                $post->setPicture($fileName);
            } else {
                $post->setPicture(null);
            }
        } else {
            $post->setPicture(null);
        }

        $post->setCreatedAt(new \DateTimeImmutable());

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
                'picture' => $post->getPicture(),
                'content' => $post->getContent(),
                'author' => $post->getAuthor()->getUsername(),
                'created_at' => $post->getCreatedAt(),
            ];
            $postsData[] = $postData;
        }

        return $this->json($postsData);
    }
}
