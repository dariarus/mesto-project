const imageAvatar = document.querySelector('.profile__avatar');

export function init(user) {
  updateAvatarOnPage(user.avatar);
  initImageAvatar();
}

const updateAvatarOnPage = (url) => {
  imageAvatar.src = url;
}

function initImageAvatar() {
  const buttonEditAvatar = document.querySelector('.profile__edit-avatar-button');
  const imageAvatar = document.querySelector('.profile__avatar');

  imageAvatar.addEventListener('mouseenter', () => {
    buttonEditAvatar.classList.add('profile__edit-avatar-button_active');
  });
  buttonEditAvatar.addEventListener('mouseleave', () => {
    buttonEditAvatar.classList.remove('profile__edit-avatar-button_active');
  });
}
