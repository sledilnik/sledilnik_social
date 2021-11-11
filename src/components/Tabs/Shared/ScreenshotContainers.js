import { PropTypes } from 'prop-types';
import { Loader } from 'components/Shared';

const ScreenshotContainer = ({
  captionTop,
  captionBottom,
  figCaptionText,
  children,
  ...props
}) => (
  <>
    {captionTop && <figcaption>{figCaptionText}</figcaption>}
    <div {...props}>{children}</div>
    {captionBottom && <figcaption>{figCaptionText}</figcaption>}
  </>
);

export const LinkImage = ({ ...props }) => {
  const { base64Img, filename, alt, ...rest } = props;
  return (
    <ScreenshotContainer {...rest}>
      <a href={`data:image/png;base64,${base64Img}`} download={filename}>
        <img
          src={`data:image/jpeg;base64,${base64Img}`}
          alt={alt}
          loading="lazy"
          decoding="true"
          async
        />
      </a>
    </ScreenshotContainer>
  );
};

LinkImage.propTypes = {
  captionTop: PropTypes.bool,
  captionBottom: PropTypes.bool,
  base64Img: PropTypes.string,
  alt: PropTypes.string,
  figCaptionText: PropTypes.node,
  filename: PropTypes.string,
};

export const Error = ({ btnHandler, ...props }) => {
  return (
    <ScreenshotContainer {...props}>
      <h3>Something went wrong!</h3>
      <button onClick={btnHandler}>Try again</button>
    </ScreenshotContainer>
  );
};

Error.propTypes = {
  captionTop: PropTypes.bool,
  captionBottom: PropTypes.bool,
  figCaptionText: PropTypes.node,
  btnHandler: PropTypes.func,
};

export const Loading = props => {
  return (
    <ScreenshotContainer {...props}>
      <Loader />
    </ScreenshotContainer>
  );
};

Loading.propTypes = {
  captionTop: PropTypes.bool,
  captionBottom: PropTypes.bool,
  figCaptionText: PropTypes.node,
};
