<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\File\Exception\FileException;
//use Symfony\Component\HttpKernel\Exception\RuntimeException;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Validator\Constraints\Image;

class FileUploader
{
    private ValidatorInterface $validator;
    public function __construct(string $targetDirectory, SluggerInterface $slugger, ValidatorInterface $validator)
    {
        $this->targetDirectory = $targetDirectory;
        $this->slugger = $slugger;
        $this->validator = $validator;
    }


    public function upload(UploadedFile $file): string
    {
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $this->slugger->slug($originalFilename);
        $fileName = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

        $violations = $this->validator->validate($file, [
            new Image([
                'mimeTypes' => ['image/png', 'image/jpeg'],
            ]),
        ]);

//        if (count($violations) > 0) {
//            throw new \RuntimeException(implode(', ', $violations));
//        }

        try {
            $file->move($this->getTargetDirectory(), $fileName);
        } catch (FileException $e) {
            dump($e->getMessage());
        }

        return $fileName;
    }

    public function getTargetDirectory(): string
    {
        return $this->targetDirectory;
    }
}