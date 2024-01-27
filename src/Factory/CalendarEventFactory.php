<?php

namespace App\Factory;

use App\Entity\CalendarEvent;
use App\Repository\CalendarEventRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<CalendarEvent>
 *
 * @method        CalendarEvent|Proxy                     create(array|callable $attributes = [])
 * @method static CalendarEvent|Proxy                     createOne(array $attributes = [])
 * @method static CalendarEvent|Proxy                     find(object|array|mixed $criteria)
 * @method static CalendarEvent|Proxy                     findOrCreate(array $attributes)
 * @method static CalendarEvent|Proxy                     first(string $sortedField = 'id')
 * @method static CalendarEvent|Proxy                     last(string $sortedField = 'id')
 * @method static CalendarEvent|Proxy                     random(array $attributes = [])
 * @method static CalendarEvent|Proxy                     randomOrCreate(array $attributes = [])
 * @method static CalendarEventRepository|RepositoryProxy repository()
 * @method static CalendarEvent[]|Proxy[]                 all()
 * @method static CalendarEvent[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static CalendarEvent[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static CalendarEvent[]|Proxy[]                 findBy(array $attributes)
 * @method static CalendarEvent[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static CalendarEvent[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class CalendarEventFactory extends ModelFactory
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
            'content' => self::faker()->paragraph(20),
            'summary' => self::faker()->paragraph(),
            'createdAt' => self::faker()->datetime(),
            'date' => CalendarDateFactory::randomOrCreate(),
            'title' => self::faker()->words(10, true),
            'updatedAt' => self::faker()->dateTime(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(CalendarEvent $calendarEvent): void {})
        ;
    }

    protected static function getClass(): string
    {
        return CalendarEvent::class;
    }
}
