<?php

namespace App\Controller;

use App\Repository\CalendarDateRepository;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
    #[Route('/', name: 'app_main', methods: ['GET', 'HEAD'])]
    public function index(
        CalendarDateRepository $calendarDateRepository,
        SerializerInterface $serializer,
        #[MapQueryParameter(
            name: "id",
            filter: \FILTER_VALIDATE_REGEXP,
            options: ['regexp' => '/^\d{1,4}$/']
        )] ?int $id = null,
    ): Response {
        if ($id) {
            $cdate = $calendarDateRepository->find($id) or throw $this->createNotFoundException("Date not found");
            $date = $serializer->serialize($cdate, 'jsonld');
            $events = $serializer->serialize($cdate->getEvents(), 'jsonld');
        }

        return $this->render('main/app.html.twig', [
            'controller_name' => 'MainController',
            'date' => json_encode($date ?? null, JSON_HEX_QUOT|JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS|JSON_UNESCAPED_SLASHES),
            'events' => json_encode($events ?? null, JSON_HEX_QUOT|JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS|JSON_UNESCAPED_SLASHES),
        ]);
    }

}