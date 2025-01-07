import { useRef, useState } from 'react';
import { IMessageProps } from '../Message';

export const useMessage = (props: IMessageProps) => {
  const { isUserMessage, dataIndex, onDelete, onEdit } = props;
  const imageClickId = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);

  const handleGalleryVisible = () => setIsGalleryVisible(false);
  const toggleMenuShow = (event: React.PointerEvent | React.MouseEvent) => {
    if (
      (event.type === 'pointerdown' && event.button === 2) ||
      event.type === 'contextmenu'
    ) {
      event.preventDefault();

      if (!isUserMessage) {
        setIsShowMenu(!isShowMenu);
      }
    }
  };
  const closeMenu = () => {
    setIsShowMenu(false);
  };
  const handleImageClick = (id: number) => {
    imageClickId.current = id;
    setIsGalleryVisible(true);
  };
  const handleDelete = () => {
    onDelete(dataIndex);
    closeMenu();
  };
  const handleEdit = () => {
    onEdit(dataIndex);
    closeMenu();
  };

  return {
    audioRef,
    isShowMenu,
    imageClickId,
    isGalleryVisible,
    closeMenu,
    toggleMenuShow,
    handleEdit,
    handleDelete,
    handleImageClick,
    handleGalleryVisible
  };
};
