<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\InvoiceRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InvoiceRepository::class)]
#[ApiResource]
class Invoice
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?float $total_amout = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $billing_date = null;

    #[ORM\ManyToOne]
    private ?User $user_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTotalAmout(): ?float
    {
        return $this->total_amout;
    }

    public function setTotalAmout(float $total_amout): static
    {
        $this->total_amout = $total_amout;

        return $this;
    }

    public function getBillingDate(): ?\DateTimeInterface
    {
        return $this->billing_date;
    }

    public function setBillingDate(\DateTimeInterface $billing_date): static
    {
        $this->billing_date = $billing_date;

        return $this;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(?User $user_id): static
    {
        $this->user_id = $user_id;

        return $this;
    }
}
