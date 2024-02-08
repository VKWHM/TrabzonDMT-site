<?php

namespace App\Entity;

use App\Repository\ApiTokenRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ApiTokenRepository::class)]
class ApiToken
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $token = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'apiTokens')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $expiration = null;

    public static function new(User $user, \DateTimeImmutable $expireAfter): static
    {
        $apiToken = new static();
        $apiToken->setUser($user);
        $apiToken->setToken(self::generateToken());
        $apiToken->setExpiration($expireAfter);

        return $apiToken;
    }

    public function isValid(): bool
    {
        return $this->getExpiration() > new \DateTimeImmutable();
    }

    protected static function generateToken(): string
    {
        return rtrim(strtr(base64_encode(random_bytes(128)), '+/', '-_'), '=');
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(string $token): static
    {
        $this->token = $token;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getExpiration(): ?\DateTimeImmutable
    {
        return $this->expiration;
    }

    public function setExpiration(\DateTimeImmutable $expiration): static
    {
        $this->expiration = $expiration;

        return $this;
    }
}
