package com.example.aula.service;

import com.example.aula.exception.PratoJaCadastradoException;
import com.example.aula.exception.PratoNaoEncontradoException;
import com.example.aula.model.Prato;
import com.example.aula.repository.PratoRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Service
@Validated
public class PratoService {
    private final PratoRepository pratoRepository;

    public PratoService(PratoRepository pratoRepository) {
        this.pratoRepository = pratoRepository;
    }

    @Transactional(readOnly = true)
    public List<Prato> listarTodos() {
        return pratoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Prato buscarPorId(Long id) {
        return buscarPorIdInterno(id);
    }

    @Transactional
    public Prato salvar(@Valid Prato prato) {
        validarNomeDuplicado(prato.getNomePrato(), null);

        return pratoRepository.save(prato);
    }

    @Transactional
    public Prato atualizar(Long id, @Valid Prato prato) {
        Prato pratoAtualizar = buscarPorIdInterno(id);
        validarNomeDuplicado(prato.getNomePrato(), id);

        pratoAtualizar.setNomePrato(prato.getNomePrato());
        pratoAtualizar.setDescricao(prato.getDescricao());
        pratoAtualizar.setPreco(prato.getPreco());
        pratoAtualizar.setCategoria(prato.getCategoria());
        pratoAtualizar.setDisponibilidade(prato.getDisponibilidade());
        pratoAtualizar.setUrlImagem(prato.getUrlImagem());

        return pratoRepository.save(pratoAtualizar);
    }

    @Transactional
    public void excluir(Long id) {
        Prato pratoExcluir = buscarPorIdInterno(id);

        pratoRepository.delete(pratoExcluir);
    }

    private Prato buscarPorIdInterno(Long id) {
        return pratoRepository.findById(id)
                .orElseThrow(() -> new PratoNaoEncontradoException("Prato não encontrado."));
    }

    private void validarNomeDuplicado(String nomePrato, Long idAtual) {
        pratoRepository.findByNomePratoIgnoreCase(nomePrato).ifPresent(pratoExistente -> {
            if (idAtual == null || !idAtual.equals(pratoExistente.getId())) {
                throw new PratoJaCadastradoException("Prato já cadastrado.");
            }
        });
    }
}
