<?php

namespace App\Command;

use App\Repository\UserRepository;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:user:delete',
    description: 'Delete a user.',
)]
class UserDeleteCommand extends Command
{
    public function __construct(
        private readonly UserRepository $userRepository,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('username', InputArgument::REQUIRED, 'The username of the user.');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $username = $input->getArgument('username');
        $user = $this->userRepository->findOneBy(['username' => $username]);
        if ($user === null) {
            $io->error("The user $username does not exist.");

            return Command::FAILURE;
        }
        if ($io->confirm("Are you sure you want to delete the user $username?", false)) {
            $this->userRepository->remove($user, true);
            $io->success('The user has been deleted successfully.');
        }

        return Command::SUCCESS;
    }
}
