<?php

namespace App\Controller;

use App\Entity\ImageInformation;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class CreateImageActionController extends AbstractController
{
    public function __invoke(Request $request): ImageInformation
    {
        $uploadedImage = $request->files->get('image');
        if (!$uploadedImage) {
            throw new BadRequestHttpException('"image" is required');
        }
        $imageInformation = new ImageInformation();
        $imageInformation->image = $uploadedImage;
        $imageInformation->setDescription($request->request->get('description'));

        return $imageInformation;
    }
}
