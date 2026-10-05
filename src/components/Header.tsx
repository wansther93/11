import React, { useState } from 'react';
import { 
  Tv, 
  Settings, 
  Search, 
  Camera 
} from 'lucide-react';
import type { User } from '../lib/firebase';
import bannerImg from '../assets/images/bannernovo.png';
import { SettingsModal } from './SettingsModal';

interface HeaderProps {
  user: User | null;
  customAvatarUrl?: string;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  onOpenAvatarModal: () => void;
  onLogout: () => void;
  onOpenBackup: () => void;
  onOpenInstallModal?: () => void;
  onOpenShareModal?: () => void;
  onOpenImageSearch?: () => void;
  onOpenSocialCard?: () => void;
  onOpenCommandPalette?: () => void;
  watchingCount: number;
  totalCount: number;
  otakuLevel?: {
    level: number;
    title?: string;
    rankTitle?: string;
    totalXp: number;
    progressPercent: number;
    currentLevelXp?: number;
    nextLevelXpRequired?: number;
  };
}

export const Header: React.FC<HeaderProps> = ({
  user,
  customAvatarUrl,
  theme = 'dark',
  onToggleTheme,
  onOpenAvatarModal,
  onLogout,
  onOpenBackup,
  onOpenInstallModal,
  onOpenShareModal,
  onOpenImageSearch,
  onOpenSocialCard,
  onOpenCommandPalette,
  otakuLevel,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const avatarImage = customAvatarUrl || user?.photoURL;

  return (
    <>
      <header className="w-full shadow-2xl bg-black select-none relative">
        {/* Banner Oficial em Alta Definição adaptado para Mobile e Desktop */}
        <div className="relative w-full h-[66px] sm:h-[78px] md:h-[90px] lg:h-[96px] flex items-center justify-between bg-black overflow-hidden">
          
          {/* Imagem do Banner Centralizada e Proporcional ao Máximo sem Cortes */}
          <div className="absolute inset-0 flex items-center justify-center bg-black pointer-events-none overflow-hidden px-14 sm:px-20 md:px-28">
            <img
              src={bannerImg}
              alt="WAnime List Official Banner"
              className="w-auto h-full max-h-full max-w-full object-contain object-center filter drop-shadow-md select-none"
            />
          </div>

          {/* Gradiente inferior suave para fusão fluida com o fundo escuro (sem linhas) */}
          <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-black to-transparent pointer-events-none" />

          {/* Controles Sobrepostos no Banner */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-6 flex items-center justify-between pointer-events-none">
            
            {/* Lado Esquerdo: Avatar Compacto com Tag de Nível e Barra de XP Flutuante */}
            <div className="pointer-events-auto shrink-0 flex items-center gap-2">
              <div className="flex flex-col items-center shrink-0 w-10 sm:w-11 md:w-11">
                <div className="relative w-full aspect-square">
                  <button
                    type="button"
                    id="btn-profile-avatar"
                    onClick={onOpenAvatarModal}
                    title="Editar perfil & foto"
                    className="relative group w-full h-full rounded-xl overflow-hidden shrink-0 border-2 border-white/70 hover:border-indigo-400 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-black/90 cursor-pointer transition-all active:scale-95 bg-black/80 backdrop-blur-md"
                  >
                    {avatarImage ? (
                      <img
                        src={avatarImage}
                        alt={user?.displayName || 'Usuário'}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Tv className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    )}

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                      <Camera className="w-3.5 h-3.5" />
                    </div>

                    {/* Tag de Level (Texto sutil no canto superior esquerdo sem container amarelo pesado) */}
                    {otakuLevel && (
                      <div
                        className="absolute top-0.5 left-0.5 z-30 px-0.5 text-[8px] font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] flex items-center justify-center leading-none pointer-events-none select-none"
                        title={`Nível ${otakuLevel.level}`}
                      >
                        Lv.{otakuLevel.level}
                      </div>
                    )}
                  </button>
                </div>

                {/* Barra de XP e Texto de XP Flutuantes (Limpos, sem fundo cinza) */}
                {otakuLevel && (
                  <div
                    onClick={onOpenAvatarModal}
                    className="w-full mt-0.5 cursor-pointer transition-transform hover:scale-105 flex flex-col items-center justify-center"
                    title={`${otakuLevel.totalXp} XP (${otakuLevel.progressPercent}% para o próximo nível)`}
                  >
                    <span className="text-[8px] font-mono text-amber-300 font-black leading-none tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,1)]">
                      {otakuLevel.totalXp >= 10000 ? `${(otakuLevel.totalXp / 1000).toFixed(1)}k` : `${otakuLevel.totalXp}`}
                    </span>
                    <div className="w-full h-[3px] bg-black/70 rounded-full overflow-hidden mt-0.5 border border-white/25 shadow-xs">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-indigo-400 rounded-full"
                        style={{ width: `${otakuLevel.progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Lado Direito: Atalho de Busca + Botão Engrenagem */}
            <div className="pointer-events-auto shrink-0 flex items-center gap-1.5 sm:gap-2">
              
              {/* Busca Rápida (Command Palette) em telas maiores */}
              {onOpenCommandPalette && (
                <button
                  type="button"
                  id="btn-header-command-palette"
                  onClick={onOpenCommandPalette}
                  title="Busca Rápida (Ctrl + K / ⌘K)"
                  className="hidden md:flex p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-black/85 hover:bg-slate-900 border border-white/20 hover:border-indigo-400 text-slate-300 hover:text-white backdrop-blur-md transition-all items-center gap-1.5 text-xs font-bold shadow-md cursor-pointer active:scale-95"
                >
                  <Search className="w-3.5 h-3.5 text-indigo-400" />
                  <kbd className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-800 border border-slate-700 text-slate-400">
                    ⌘K
                  </kbd>
                </button>
              )}

              {/* Botão Único de Configurações (Engrenagem) */}
              <button
                id="btn-header-menu"
                type="button"
                onClick={() => setIsSettingsOpen(true)}
                title="Configurações, Notificações, Backup e Conta"
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-black/85 hover:bg-slate-900 border border-white/20 hover:border-indigo-400 text-white backdrop-blur-md transition-all flex items-center gap-1.5 text-xs font-bold shadow-lg cursor-pointer active:scale-95"
              >
                <Settings className="w-4 h-4 text-indigo-400 transition-transform hover:rotate-45" />
                <span className="hidden sm:inline text-xs font-medium">Ajustes</span>
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* Modal Unificado de Configurações */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        user={user}
        customAvatarUrl={customAvatarUrl}
        theme={theme}
        onToggleTheme={onToggleTheme}
        onOpenAvatarModal={onOpenAvatarModal}
        onLogout={onLogout}
        onOpenBackup={onOpenBackup}
        onOpenInstallModal={onOpenInstallModal}
        onOpenShareModal={onOpenShareModal}
        onOpenImageSearch={onOpenImageSearch}
        onOpenSocialCard={onOpenSocialCard}
        otakuLevel={otakuLevel}
      />
    </>
  );
};
