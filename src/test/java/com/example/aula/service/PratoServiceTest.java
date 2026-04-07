package com.example.aula.service;

import com.example.aula.exception.PratoJaCadastradoException;
import com.example.aula.exception.PratoNaoEncontradoException;
import com.example.aula.model.Categoria;
import com.example.aula.model.Disponibilidade;
import com.example.aula.model.Prato;
import com.example.aula.repository.PratoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PratoServiceTest {

    @Mock
    private PratoRepository pratoRepository;

    @InjectMocks
    private PratoService pratoService;

    @Test
    void deveSalvarPratoQuandoNomeNaoExiste() {
        Prato prato = criarPrato(null, "Feijoada");

        when(pratoRepository.findByNomePratoIgnoreCase("Feijoada")).thenReturn(Optional.empty());
        when(pratoRepository.save(prato)).thenReturn(prato);

        Prato salvo = pratoService.salvar(prato);

        assertThat(salvo).isEqualTo(prato);
        verify(pratoRepository).save(prato);
    }

    @Test
    void naoDeveSalvarPratoComNomeDuplicado() {
        Prato prato = criarPrato(null, "Feijoada");

        when(pratoRepository.findByNomePratoIgnoreCase("Feijoada")).thenReturn(Optional.of(criarPrato(1L, "Feijoada")));

        assertThatThrownBy(() -> pratoService.salvar(prato))
                .isInstanceOf(PratoJaCadastradoException.class)
                .hasMessage("Prato já cadastrado.");
    }

    @Test
    void deveAtualizarPratoExistente() {
        Prato existente = criarPrato(1L, "Feijoada");
        Prato novoEstado = criarPrato(null, "Moqueca");

        when(pratoRepository.findById(1L)).thenReturn(Optional.of(existente));
        when(pratoRepository.findByNomePratoIgnoreCase("Moqueca")).thenReturn(Optional.empty());
        when(pratoRepository.save(existente)).thenReturn(existente);

        Prato atualizado = pratoService.atualizar(1L, novoEstado);

        assertThat(atualizado.getNomePrato()).isEqualTo("Moqueca");
        assertThat(atualizado.getDescricao()).isEqualTo(novoEstado.getDescricao());
        assertThat(atualizado.getPreco()).isEqualTo(novoEstado.getPreco());
    }

    @Test
    void naoDeveAtualizarQuandoPratoNaoExiste() {
        when(pratoRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> pratoService.atualizar(999L, criarPrato(null, "Inexistente")))
                .isInstanceOf(PratoNaoEncontradoException.class)
                .hasMessage("Prato não encontrado.");
    }

    @Test
    void naoDeveAtualizarQuandoNomeJaUsadoPorOutroPrato() {
        Prato existente = criarPrato(1L, "Feijoada");
        Prato outro = criarPrato(2L, "Moqueca");
        Prato novoEstado = criarPrato(null, "Moqueca");

        when(pratoRepository.findById(1L)).thenReturn(Optional.of(existente));
        when(pratoRepository.findByNomePratoIgnoreCase("Moqueca")).thenReturn(Optional.of(outro));

        assertThatThrownBy(() -> pratoService.atualizar(1L, novoEstado))
                .isInstanceOf(PratoJaCadastradoException.class)
                .hasMessage("Prato já cadastrado.");
    }

    @Test
    void deveExcluirPratoExistente() {
        Prato existente = criarPrato(1L, "Feijoada");

        when(pratoRepository.findById(1L)).thenReturn(Optional.of(existente));

        pratoService.excluir(1L);

        verify(pratoRepository).delete(existente);
    }

    private Prato criarPrato(Long id, String nome) {
        Prato prato = new Prato();
        prato.setId(id);
        prato.setNomePrato(nome);
        prato.setDescricao("Descricao de teste");
        prato.setPreco(10.0);
        prato.setCategoria(Categoria.SIMPLES);
        prato.setDisponibilidade(Disponibilidade.DISPONIVEL);
        prato.setUrlImagem("https://example.com/imagem.jpg");
        return prato;
    }
}
