<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
    #[Route('/', name: 'app_main', methods: ['GET', 'HEAD'])]
    public function index(
        #[MapQueryParameter(
            name: "id",
            filter: \FILTER_VALIDATE_REGEXP,
            options: ['regexp' => '/^\d{1,4}$/']
        )] ?int $id = null
    ): Response {
        return $this->render('main/index.html.twig', [
            'controller_name' => 'MainController',
            'id' => $id
        ]);
    }
}
