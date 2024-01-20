<?php

namespace App\Controller;

use App\Repository\CalendarDateRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
    #[Route('/', name: 'app_main', methods: ['GET', 'HEAD'])]
    public function index(
        CalendarDateRepository $calendarDateRepository,
        #[MapQueryParameter(
            name: "id",
            filter: \FILTER_VALIDATE_REGEXP,
            options: ['regexp' => '/^\d{1,4}$/']
        )] ?int $id = null,
    ): Response {
        if ($id) {
            $date = $calendarDateRepository->find($id) or throw $this->createNotFoundException("Date not found");
        }

        return $this->render('main/index.html.twig', [
            'controller_name' => 'MainController',
            'date' => $date ?? null,
        ]);
    }
}
