<?php

namespace App\Command;

use App\Repository\UserRepository;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\Question;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:user:create',
    description: 'Create a new user.',
)]
class UserCreateCommand extends Command
{
    public function __construct(
        private readonly UserRepository $userRepository,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('username', InputArgument::REQUIRED, 'The username of the user.')
            ->setHelp('This command allows you to create a new user.');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $io->title('Create a new user');
        $username = $input->getArgument('username');
        if ($this->userRepository->findOneBy(['username' => $username]) !== null) {
            $io->error("The username $username already exists.");

            return Command::FAILURE;
        }
        $password = $io->askHidden('Please enter the password of the user', function ($password) {
            if (empty($password)) {
                throw new \RuntimeException('The password cannot be empty.');
            }

            return $password;
        });

        $question = new Question('Please enter the email of the user', null);
        $question->setValidator(function ($email) {
            if (empty($email)) {
                return null;
            }
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                throw new \RuntimeException('The email is not valid.');
            }

            return $email;
        });
        $email = $io->askQuestion($question);
        $question = new Question('Please enter the roles of the user (separated by a comma)', 'ROLE_USER');
        $question->setNormalizer(function ($value) {
            return explode(',', strtoupper($value));
        });
        $roles = $io->askQuestion($question);
        $this->userRepository->createUser(
            $username,
            $password,
            $email,
            $roles
        );
        $io->success('The user has been created successfully.');

        return Command::SUCCESS;
    }
}
