<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230912140646 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `admin` DROP FOREIGN KEY FK_880E0D7679F37AE5');
        $this->addSql('ALTER TABLE notification DROP FOREIGN KEY FK_BF5476CAA76ED395');
        $this->addSql('ALTER TABLE friendship DROP FOREIGN KEY FK_7234A45F441B8B65');
        $this->addSql('ALTER TABLE friendship DROP FOREIGN KEY FK_7234A45F56AE248B');
        $this->addSql('DROP TABLE `admin`');
        $this->addSql('DROP TABLE notification');
        $this->addSql('DROP TABLE friendship');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C4B89032C');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526CA76ED395');
        $this->addSql('DROP INDEX IDX_9474526CA76ED395 ON comment');
        $this->addSql('DROP INDEX IDX_9474526C4B89032C ON comment');
        $this->addSql('ALTER TABLE comment DROP user_id, DROP post_id, DROP content, DROP created_at, DROP updated_at');
        $this->addSql('ALTER TABLE post ADD author_id_id INT NOT NULL, DROP picture, CHANGE content content LONGTEXT NOT NULL');
        $this->addSql('ALTER TABLE post ADD CONSTRAINT FK_5A8A6C8D69CCBE9A FOREIGN KEY (author_id_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_5A8A6C8D69CCBE9A ON post (author_id_id)');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649D5E258C5');
        $this->addSql('DROP INDEX IDX_8D93D649D5E258C5 ON user');
        $this->addSql('ALTER TABLE user DROP posts_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE `admin` (id INT AUTO_INCREMENT NOT NULL, id_user_id INT DEFAULT NULL, is_admin TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_880E0D7679F37AE5 (id_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE notification (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, content LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, is_read TINYINT(1) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_BF5476CAA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE friendship (id INT AUTO_INCREMENT NOT NULL, user1_id INT DEFAULT NULL, user2_id INT DEFAULT NULL, status VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', UNIQUE INDEX UNIQ_7234A45F56AE248B (user1_id), UNIQUE INDEX UNIQ_7234A45F441B8B65 (user2_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE `admin` ADD CONSTRAINT FK_880E0D7679F37AE5 FOREIGN KEY (id_user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE notification ADD CONSTRAINT FK_BF5476CAA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE friendship ADD CONSTRAINT FK_7234A45F441B8B65 FOREIGN KEY (user2_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE friendship ADD CONSTRAINT FK_7234A45F56AE248B FOREIGN KEY (user1_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE user ADD posts_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649D5E258C5 FOREIGN KEY (posts_id) REFERENCES post (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_8D93D649D5E258C5 ON user (posts_id)');
        $this->addSql('ALTER TABLE post DROP FOREIGN KEY FK_5A8A6C8D69CCBE9A');
        $this->addSql('DROP INDEX IDX_5A8A6C8D69CCBE9A ON post');
        $this->addSql('ALTER TABLE post ADD picture VARCHAR(255) DEFAULT NULL, DROP author_id_id, CHANGE content content LONGTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE comment ADD user_id INT DEFAULT NULL, ADD post_id INT DEFAULT NULL, ADD content LONGTEXT NOT NULL, ADD created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C4B89032C FOREIGN KEY (post_id) REFERENCES post (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_9474526CA76ED395 ON comment (user_id)');
        $this->addSql('CREATE INDEX IDX_9474526C4B89032C ON comment (post_id)');
    }
}
