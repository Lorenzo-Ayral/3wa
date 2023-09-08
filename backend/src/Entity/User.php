<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $username = null;

    #[ORM\Column(length: 255)]
    private ?string $first_name = null;

    #[ORM\Column(length: 255)]
    private ?string $last_name = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date_of_birth = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $profile_picture = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updated_at = null;

    #[ORM\ManyToOne(inversedBy: 'id_user')]
    private ?Post $id_posts = null;

    #[ORM\OneToMany(mappedBy: 'id_user', targetEntity: Comment::class)]
    private Collection $id_comments;

    #[ORM\OneToMany(mappedBy: 'id_user', targetEntity: Notification::class)]
    private Collection $id_notifications;

    public function __construct()
    {
        $this->id_comments = new ArrayCollection();
        $this->id_notifications = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->first_name;
    }

    public function setFirstName(string $first_name): static
    {
        $this->first_name = $first_name;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->last_name;
    }

    public function setLastName(string $last_name): static
    {
        $this->last_name = $last_name;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getDateOfBirth(): ?\DateTimeInterface
    {
        return $this->date_of_birth;
    }

    public function setDateOfBirth(\DateTimeInterface $date_of_birth): static
    {
        $this->date_of_birth = $date_of_birth;

        return $this;
    }

    public function getProfilePicture(): ?string
    {
        return $this->profile_picture;
    }

    public function setProfilePicture(?string $profile_picture): static
    {
        $this->profile_picture = $profile_picture;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updated_at): static
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    public function getIdPosts(): ?Post
    {
        return $this->id_posts;
    }

    public function setIdPosts(?Post $id_posts): static
    {
        $this->id_posts = $id_posts;

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getIdComments(): Collection
    {
        return $this->id_comments;
    }

    public function addIdComment(Comment $idComment): static
    {
        if (!$this->id_comments->contains($idComment)) {
            $this->id_comments->add($idComment);
            $idComment->setIdUser($this);
        }

        return $this;
    }

    public function removeIdComment(Comment $idComment): static
    {
        if ($this->id_comments->removeElement($idComment)) {
            // set the owning side to null (unless already changed)
            if ($idComment->getIdUser() === $this) {
                $idComment->setIdUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Notification>
     */
    public function getIdNotifications(): Collection
    {
        return $this->id_notifications;
    }

    public function addIdNotification(Notification $idNotification): static
    {
        if (!$this->id_notifications->contains($idNotification)) {
            $this->id_notifications->add($idNotification);
            $idNotification->setIdUser($this);
        }

        return $this;
    }

    public function removeIdNotification(Notification $idNotification): static
    {
        if ($this->id_notifications->removeElement($idNotification)) {
            // set the owning side to null (unless already changed)
            if ($idNotification->getIdUser() === $this) {
                $idNotification->setIdUser(null);
            }
        }

        return $this;
    }
}
