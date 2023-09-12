<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $user->setFirstName('First name ' . $i);
            $user->setLastName('Last name ' . $i);
            $user->setEmail('email' . $i . '@gmail.com');
            $user->setPassword('password' . $i);
            $user->setUsername('username' . $i);
            $user->setDateOfBirth(new \DateTimeImmutable('now'));
            $user->setCreatedAt(new \DateTimeImmutable('now'));
            $manager->persist($user);

            $post = new Post();
            $post->setContent('Content ' . $i);
            $post->setAuthor($user);
            $post->setCreatedAt(new \DateTimeImmutable('now'));
            $manager->persist($post);
        }
        // $product = new Product();
        // $manager->persist($product);

        $manager->flush();
    }
}
