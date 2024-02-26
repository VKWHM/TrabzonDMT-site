<?php

namespace App\Trait;

use Doctrine\ORM\Mapping as ORM;

trait Timestampable
{
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;
    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;

    /**
     * @throws \Exception
     */
    #[ORM\PrePersist()]
    public function prePersist(): void
    {
        $this->createdAt = new \DateTimeImmutable('now', new \DateTimeZone('Europe/Istanbul'));
        $this->updatedAt = new \DateTimeImmutable('now', new \DateTimeZone('Europe/Istanbul'));
    }

    /**
     * @throws \Exception
     */
    #[ORM\PreUpdate()]
    public function preUpdate(): void
    {
        $this->updatedAt = new \DateTimeImmutable('now', new \DateTimeZone('Europe/Istanbul'));
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }


}