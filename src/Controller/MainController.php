<?php

namespace App\Controller;

use App\Entity\ApiToken;
use App\Repository\CalendarDateRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

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

    #[Route('/tdmt_admin', name: 'app_admin', methods: ['GET', 'HEAD'])]
    public function admin(): Response
    {
        return $this->render('main/admin.html.twig');
    }

    #[Route('/tdmt_admin/login', name: 'app_admin_login', methods: ['POST'])]
    public function admin_login(EntityManagerInterface $manager, #[CurrentUser] $user): Response
    {
        $api_token = ApiToken::new($user);
        $manager->persist($api_token);
        $manager->flush();

        return $this->json([
            'id' => $user->getUserIdentifier(),
            'token' => $api_token->getToken(),
        ]);
    }
}
