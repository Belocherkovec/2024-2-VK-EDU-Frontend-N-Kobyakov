import { Header, HeaderThemes } from 'ReactChat/src/features/Header';
import { BackButton, DoneButton, TEXTS } from 'ReactChat/src/shared';

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
