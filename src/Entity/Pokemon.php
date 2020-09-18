<?php

namespace App\Entity;

use App\Repository\PokemonRepository;
use Doctrine\ORM\Mapping as ORM;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=PokemonRepository::class)
 * @ApiResource 
 * @ApiFilter(SearchFilter::class, properties={"name": "start"})
 */

class Pokemon
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     */
    public $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    public $name;

    /**
     * @ORM\Column(type="string", length=512, nullable=true)
     */
    public $sprite;

    /**
     * @ORM\Column(type="integer")
     */
    private $type1;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $type2;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $ability1;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $ability2;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $ability3;

    /**
     * @ORM\Column(type="integer")
     */
    private $hp;

    /**
     * @ORM\Column(type="integer")
     */
    private $attack;

    /**
     * @ORM\Column(type="integer")
     */
    private $Defense;

    /**
     * @ORM\Column(type="integer")
     */
    private $special_attack;

    /**
     * @ORM\Column(type="integer")
     */
    private $special_defense;

    /**
     * @ORM\Column(type="integer")
     */
    private $speed;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {   
        $this->id = $id;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSprite(): ?string
    {
        return $this->sprite;
    }

    public function setSprite(?string $sprite): self
    {
        $this->sprite = $sprite;

        return $this;
    }

    public function getType1(): ?int
    {
        return $this->type1;
    }

    public function setType1(int $type1): self
    {
        $this->type1 = $type1;

        return $this;
    }

    public function getType2(): ?int
    {
        return $this->type2;
    }

    public function setType2(?int $type2): self
    {
        $this->type2 = $type2;

        return $this;
    }

    public function getAbility1(): ?int
    {
        return $this->ability1;
    }

    public function setAbility1(?int $ability1): self
    {
        $this->ability1 = $ability1;

        return $this;
    }

    public function getAbility2(): ?int
    {
        return $this->ability2;
    }

    public function setAbility2(?int $ability2): self
    {
        $this->ability2 = $ability2;

        return $this;
    }

    public function getAbility3(): ?int
    {
        return $this->ability3;
    }

    public function setAbility3(?int $ability3): self
    {
        $this->ability3 = $ability3;

        return $this;
    }

    public function getHp(): ?int
    {
        return $this->hp;
    }

    public function setHp(int $hp): self
    {
        $this->hp = $hp;

        return $this;
    }

    public function getAttack(): ?int
    {
        return $this->attack;
    }

    public function setAttack(int $attack): self
    {
        $this->attack = $attack;

        return $this;
    }

    public function getDefense(): ?int
    {
        return $this->Defense;
    }

    public function setDefense(int $Defense): self
    {
        $this->Defense = $Defense;

        return $this;
    }

    public function getSpecialAttack(): ?int
    {
        return $this->special_attack;
    }

    public function setSpecialAttack(int $special_attack): self
    {
        $this->special_attack = $special_attack;

        return $this;
    }

    public function getSpecialDefense(): ?int
    {
        return $this->special_defense;
    }

    public function setSpecialDefense(int $special_defense): self
    {
        $this->special_defense = $special_defense;

        return $this;
    }

    public function getSpeed(): ?int
    {
        return $this->speed;
    }

    public function setSpeed(int $speed): self
    {
        $this->speed = $speed;

        return $this;
    }
}
