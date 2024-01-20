<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240120083625 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE calendar_event DROP FOREIGN KEY FK_57FA09C9B897366B');
        $this->addSql('ALTER TABLE calendar_event ADD CONSTRAINT FK_57FA09C9B897366B FOREIGN KEY (date_id) REFERENCES calendar_date (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE calendar_event DROP FOREIGN KEY FK_57FA09C9B897366B');
        $this->addSql('ALTER TABLE calendar_event ADD CONSTRAINT FK_57FA09C9B897366B FOREIGN KEY (date_id) REFERENCES calendar_date (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
    }
}
