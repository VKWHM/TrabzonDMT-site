<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\CalendarEventRepository;
use App\Trait\Timestampable;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CalendarEventRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Get(),
        new Patch(),
        new Post(),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['calendar_event:read']],
    denormalizationContext: ['groups' => ['calendar_event:write']],
)]
class CalendarEvent
{
    use Timestampable;
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['calendar_event:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'events')]
    #[ORM\JoinColumn(nullable: false, onDelete: "CASCADE")]
    #[Assert\NotBlank]
    #[Groups(['calendar_event:read', 'calendar_event:write'])]
    private ?CalendarDate $date = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['calendar_event:read', 'calendar_event:write'])]
    private ?string $title = null;

    #[ORM\Column(length: 511, nullable: true)]
    #[Groups(['calendar_event:read', 'calendar_event:write'])]
    private ?string $summary = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\NotBlank]
    #[Groups(['calendar_event:read', 'calendar_event:write'])]
    private ?string $content = null;

    #[ORM\Column]
    #[Groups(['calendar_event:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    #[Groups(['calendar_event:read'])]
    private ?\DateTimeImmutable $updatedAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?CalendarDate
    {
        return $this->date;
    }

    public function setDate(?CalendarDate $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getSummary(): ?string
    {
        return $this->summary;
    }

    public function setSummary(?string $summary): static
    {
        $this->summary = $summary;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;

        return $this;
    }
}
