<?php

namespace App\Repository;

use App\Entity\ImageInformation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ImageInformation>
 *
 * @method ImageInformation|null find($id, $lockMode = null, $lockVersion = null)
 * @method ImageInformation|null findOneBy(array $criteria, array $orderBy = null)
 * @method ImageInformation[]    findAll()
 * @method ImageInformation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ImageInformationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ImageInformation::class);
    }

//    /**
//     * @return ImageInformation[] Returns an array of ImageInformation objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('i.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ImageInformation
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
