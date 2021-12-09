import React, { FunctionComponent } from 'react';

import { ImagePicker } from 'antd-mobile';

// interface ImageFile {
//   url: string;
//   [key: string]: any;
// }

interface ImagePickerProps {
  //files: ImageFile[];
  selectable: boolean;
}

const ProfileIamgeInput: FunctionComponent<ImagePickerProps> = ({ selectable }) => {
  return (
    <div>
      <ImagePicker selectable={selectable}/>
      <p>Configuración de la imagen de perfil...</p>
    </div>
  );
};

export default ProfileIamgeInput;
