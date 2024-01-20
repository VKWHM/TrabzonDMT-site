<?php

namespace App\Factory;

use App\Entity\CalendarDate;
use App\Repository\CalendarDateRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<CalendarDate>
 *
 * @method        CalendarDate|Proxy                     create(array|callable $attributes = [])
 * @method static CalendarDate|Proxy                     createOne(array $attributes = [])
 * @method static CalendarDate|Proxy                     find(object|array|mixed $criteria)
 * @method static CalendarDate|Proxy                     findOrCreate(array $attributes)
 * @method static CalendarDate|Proxy                     first(string $sortedField = 'id')
 * @method static CalendarDate|Proxy                     last(string $sortedField = 'id')
 * @method static CalendarDate|Proxy                     random(array $attributes = [])
 * @method static CalendarDate|Proxy                     randomOrCreate(array $attributes = [])
 * @method static CalendarDateRepository|RepositoryProxy repository()
 * @method static CalendarDate[]|Proxy[]                 all()
 * @method static CalendarDate[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static CalendarDate[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static CalendarDate[]|Proxy[]                 findBy(array $attributes)
 * @method static CalendarDate[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static CalendarDate[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class CalendarDateFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     */
    protected function getDefaults(): array
    {
        return [
            'createdAt' => \DateTimeImmutable::createFromMutable(self::faker()->dateTime()),
            'day' => self::faker()->numberBetween(1, 32),
            'month' => self::faker()->numberBetween(1, 12),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(CalendarDate $calendarDate): void {})
        ;
    }

    protected static function getClass(): string
    {
        return CalendarDate::class;
    }
}
