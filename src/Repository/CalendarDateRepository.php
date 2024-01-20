<?php

namespace App\Repository;

use App\Entity\CalendarDate;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CalendarDate>
 *
 * @method CalendarDate|null find($id, $lockMode = null, $lockVersion = null)
 * @method CalendarDate|null findOneBy(array $criteria, array $orderBy = null)
 * @method CalendarDate[]    findAll()
 * @method CalendarDate[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CalendarDateRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CalendarDate::class);
    }

//    /**
//     * @return CalendarDate[] Returns an array of CalendarDate objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CalendarDate
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
