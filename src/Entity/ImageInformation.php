<?php

namespace App\Entity;

use App\Trait\Timestampable;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model;
use ApiPlatform\Metadata\Patch;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\ImageInformationRepository;
use App\Controller\CreateImageActionController;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Patch(),
// TODO: Add delete operation to the image information resource
//        new Delete(),
        new Post(
            controller: CreateImageActionController::class,
            openapi: new Model\Operation(
                requestBody: new Model\RequestBody(
                    content: new \ArrayObject([
                        'multipart/form-data' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'image' => [
                                        'type' => 'string',
                                        'format' => 'binary',
                                    ],
                                    'description' => [
                                        'type' => 'string',
                                    ],
                                ],
                            ],
                        ],
                    ])
                )
            ),
            security: "is_granted('ROLE_USER')",
            validationContext: ['groups' => ['image_upload']],
            deserialize: false
        ),
    ],
    normalizationContext: [
        'groups' => ['image_information:read'],
    ],
    denormalizationContext: [
        'groups' => ['image_information:write'],
    ]
)]
#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: ImageInformationRepository::class)]
#[ORM\HasLifecycleCallbacks]
class ImageInformation
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['image_information:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true, nullable: true)]
    private ?string $imageName = null;

    #[Groups(['image_information:read'])]
    public ?string $imageUrl = null;

    #[Vich\UploadableField(mapping: "image_information", fileNameProperty: "imageName")]
    #[Assert\NotNull(groups: ['image_upload'])]
    #[Assert\File(
        maxSize: "5M",
        mimeTypes: ["image/jpeg", "image/png"],
        maxSizeMessage: "The maximum allowed file size is 5M.",
        mimeTypesMessage: "Only JPEG and PNG images are allowed.",
        groups: ['image_upload'],
    )]
    public ?File $image = null;

    #[ORM\Column(length: 511, nullable: true)]
    #[Groups(['image_information:read', 'image_information:write'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['image_information:read'])]
    private ?\DateTimeImmutable $createdAt = null;
    #[ORM\Column]
    #[Groups(['image_information:read'])]
    private ?\DateTimeImmutable $updatedAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getImageName(): ?string
    {
        return $this->imageName;
    }

    public function setImageName(string $imageName): static
    {
        $this->imageName = $imageName;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }
}
