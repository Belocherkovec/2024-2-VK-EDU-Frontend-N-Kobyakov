import { Header, HeaderThemes } from '@/features/Header';
import { BackButton, DoneButton } from '@/shared/components/buttons';
import { TEXTS } from '@/shared/consts/texts';

export const EditProfileHeader: React.FC<{ onSave: () => void }> = ({
  onSave
}) => (
  <Header
    centerNode={<h3>{TEXTS.headings.EditProfile}</h3>}
    leftNode={<BackButton />}
    rightNode={<DoneButton onClick={onSave} />}
    theme={HeaderThemes.COLORED}
  />
);
