package com.example.aula.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity
@Table(name = "tab_prato")
public class Prato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome do prato é obrigatório.")
    @Column(nullable = false, unique = true, length = 120)
    private String nomePrato;

    @NotBlank(message = "Descrição do prato é obrigatório.")
    @Column(nullable = false, length = 500)
    private String descricao;

    @NotNull(message = "Preço não pode ser nulo")
    @DecimalMin(value = "0.0", inclusive = false, message = "Preço deve ser maior que zero")
    @Column(nullable = false)
    private Double preco;

    @NotNull(message = "Categoria é obrigatória.")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Categoria categoria;

    @NotNull(message = "Disponibilidade é obrigatória.")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Disponibilidade disponibilidade;

    @NotBlank(message = "Necessário imagem do prato.")
    @Column(nullable = false, length = 500)
    private String urlImagem;

}
