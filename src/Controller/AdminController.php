<?php

namespace App\Controller;

use App\Entity\ApiToken;
use App\Repository\ApiTokenRepository;
use DateTimeImmutable;
use DateTimeZone;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class AdminController extends AbstractController
{
    #[Route('/tdmt_admin', name: 'app_admin', methods: ['GET', 'HEAD'])]
    public function admin(): Response
    {
        return $this->render('main/admin.html.twig');
    }

    #[Route('/tdmt_admin/login', name: 'app_admin_login', methods: ['POST'])]
    public function admin_login(
        EntityManagerInterface $manager,
        LoggerInterface $logger,
        #[CurrentUser] $user
    ): Response {
        try {
            $api_token = ApiToken::new(
                $user,
                new DateTimeImmutable(
                    "+".$this->getParameter('app.api_token_lifetime'),
                    new DateTimeZone('Europe/Istanbul'),
                )
            );
        } catch (Exception $e) {
            $logger->error('Could not create token: '.$e->getMessage());

            return $this->json(['error' => 'Could not create token'], 500);
        }
        $manager->persist($api_token);
        $manager->flush();

        return $this->json([
            'id' => $user->getUserIdentifier(),
            'token' => $api_token->getToken(),
        ]);
    }

    #[Route('/tdmt_admin/logout', name: 'app_admin_logout', methods: ['POST'])]
    public function admin_logout(
        EntityManagerInterface $manager,
        Request $request,
        Security $security,
        ApiTokenRepository $apiTokenRepository,

    ): Response {
        if ($security->isGranted('IS_AUTHENTICATED_FULLY')) {
            $api_token_string = str_replace('Bearer ', '', $request->headers->get('Authorization'));
            $api_token = $apiTokenRepository->findOneBy(['token' => $api_token_string]);
            $manager->remove($api_token);
            $manager->flush();

            return new Response('', 204);
        }
        throw new NotFoundHttpException();
    }
}
