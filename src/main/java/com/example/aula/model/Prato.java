package com.example.aula.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name = "tab_prato")
public class Prato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome do prato é obrigatório.")
    private String nomePrato;

    @NotBlank(message = "Descrição do prato é obrigatório.")
    private String descricao;

    @NotBlank(message = "Preço do prato é obrigatório.")
    private Double preco;

    @Enumerated(EnumType.STRING)
    private Categoria categoria;

    @Enumerated(EnumType.STRING)
    private Disponibilidade disponibilidade;

    @NotBlank(message = "Necessário imagem do prato.")
    private String urlImagem;

}