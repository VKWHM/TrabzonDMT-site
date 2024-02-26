<?php

namespace App\Command;

use App\Repository\ApiTokenRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Exception\ORMException;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;


#[AsCommand(
    name: 'app:tokens:clear-expired',
    description: 'Add a short description for your command',
)]
class ClearExpiredTokensCommand extends Command
{
    public function __construct(
        private readonly ApiTokenRepository $apiTokenRepository,
        private readonly EntityManagerInterface $entityManager,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $count = 0;
        $tokens = $this->apiTokenRepository->findAll();
        foreach ($tokens as $token) {
            if (!$token->isValid()) {
                try {
                    $this->entityManager->remove($token);
                    $count++;
                } catch (ORMException $e) {
                }
            }
        }
        if ($count === 0) {
            $io->success("No expired tokens were found.");
        } else {
            $io->success("$count Expired tokens were removed successfully.");
        }

        return Command::SUCCESS;
    }
}
