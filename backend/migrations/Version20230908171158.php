<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230908171158 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C79F37AE5');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C9514AA5C');
        $this->addSql('DROP INDEX IDX_9474526C79F37AE5 ON comment');
        $this->addSql('DROP INDEX IDX_9474526C9514AA5C ON comment');
        $this->addSql('ALTER TABLE comment ADD user_id INT DEFAULT NULL, ADD post_id INT DEFAULT NULL, DROP id_user_id, DROP id_post_id');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C4B89032C FOREIGN KEY (post_id) REFERENCES post (id)');
        $this->addSql('CREATE INDEX IDX_9474526CA76ED395 ON comment (user_id)');
        $this->addSql('CREATE INDEX IDX_9474526C4B89032C ON comment (post_id)');
        $this->addSql('ALTER TABLE friendship DROP FOREIGN KEY FK_7234A45F675C81E');
        $this->addSql('ALTER TABLE friendship DROP FOREIGN KEY FK_7234A45F14C067F0');
        $this->addSql('DROP INDEX UNIQ_7234A45F14C067F0 ON friendship');
        $this->addSql('DROP INDEX UNIQ_7234A45F675C81E ON friendship');
        $this->addSql('ALTER TABLE friendship ADD user1_id INT DEFAULT NULL, ADD user2_id INT DEFAULT NULL, DROP id_user1_id, DROP id_user2_id');
        $this->addSql('ALTER TABLE friendship ADD CONSTRAINT FK_7234A45F56AE248B FOREIGN KEY (user1_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE friendship ADD CONSTRAINT FK_7234A45F441B8B65 FOREIGN KEY (user2_id) REFERENCES user (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_7234A45F56AE248B ON friendship (user1_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_7234A45F441B8B65 ON friendship (user2_id)');
        $this->addSql('ALTER TABLE notification DROP FOREIGN KEY FK_BF5476CA79F37AE5');
        $this->addSql('DROP INDEX IDX_BF5476CA79F37AE5 ON notification');
        $this->addSql('ALTER TABLE notification CHANGE id_user_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE notification ADD CONSTRAINT FK_BF5476CAA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_BF5476CAA76ED395 ON notification (user_id)');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6498539B450');
        $this->addSql('DROP INDEX IDX_8D93D6498539B450 ON user');
        $this->addSql('ALTER TABLE user CHANGE id_posts_id posts_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649D5E258C5 FOREIGN KEY (posts_id) REFERENCES post (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649D5E258C5 ON user (posts_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE notification DROP FOREIGN KEY FK_BF5476CAA76ED395');
        $this->addSql('DROP INDEX IDX_BF5476CAA76ED395 ON notification');
        $this->addSql('ALTER TABLE notification CHANGE user_id id_user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE notification ADD CONSTRAINT FK_BF5476CA79F37AE5 FOREIGN KEY (id_user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_BF5476CA79F37AE5 ON notification (id_user_id)');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526CA76ED395');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C4B89032C');
        $this->addSql('DROP INDEX IDX_9474526CA76ED395 ON comment');
        $this->addSql('DROP INDEX IDX_9474526C4B89032C ON comment');
        $this->addSql('ALTER TABLE comment ADD id_user_id INT DEFAULT NULL, ADD id_post_id INT DEFAULT NULL, DROP user_id, DROP post_id');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C79F37AE5 FOREIGN KEY (id_user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C9514AA5C FOREIGN KEY (id_post_id) REFERENCES post (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_9474526C79F37AE5 ON comment (id_user_id)');
        $this->addSql('CREATE INDEX IDX_9474526C9514AA5C ON comment (id_post_id)');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649D5E258C5');
        $this->addSql('DROP INDEX IDX_8D93D649D5E258C5 ON user');
        $this->addSql('ALTER TABLE user CHANGE posts_id id_posts_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6498539B450 FOREIGN KEY (id_posts_id) REFERENCES post (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_8D93D6498539B450 ON user (id_posts_id)');
        $this->addSql('ALTER TABLE friendship DROP FOREIGN KEY FK_7234A45F56AE248B');
        $this->addSql('ALTER TABLE friendship DROP FOREIGN KEY FK_7234A45F441B8B65');
        $this->addSql('DROP INDEX UNIQ_7234A45F56AE248B ON friendship');
        $this->addSql('DROP INDEX UNIQ_7234A45F441B8B65 ON friendship');
        $this->addSql('ALTER TABLE friendship ADD id_user1_id INT DEFAULT NULL, ADD id_user2_id INT DEFAULT NULL, DROP user1_id, DROP user2_id');
        $this->addSql('ALTER TABLE friendship ADD CONSTRAINT FK_7234A45F675C81E FOREIGN KEY (id_user1_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE friendship ADD CONSTRAINT FK_7234A45F14C067F0 FOREIGN KEY (id_user2_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_7234A45F14C067F0 ON friendship (id_user2_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_7234A45F675C81E ON friendship (id_user1_id)');
    }
}
