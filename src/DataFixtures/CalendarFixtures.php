<?php

namespace App\DataFixtures;

use App\Entity\CalendarDate;
use App\Factory\CalendarDateFactory;
use App\Factory\CalendarEventFactory;
use App\Repository\CalendarDateRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CalendarFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        CalendarDateFactory::createMany(300);
        CalendarEventFactory::createMany(450);
    }
}
