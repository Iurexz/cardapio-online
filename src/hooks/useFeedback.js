import { useState } from 'react';

const useFeedback = () => {
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('');
  const [visivel, setVisivel] = useState(false);

  const exibirMensagem = (texto, tipo) => {
    setMensagem(texto);
    setTipoMensagem(tipo);
    setVisivel(true);

    // Esconde a mensagem após 5 segundos
    setTimeout(() => {
      setVisivel(false);
    }, 5000);
  };

  const fecharMensagem = () => {
    setVisivel(false);
  };

  return {
    mensagem,
    tipoMensagem,
    visivel,
    exibirMensagem,
    fecharMensagem
  };
};

export default useFeedback;
