class User < ApplicationRecord
  has_secure_password

  has_many :restaurants, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :swipes, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :password, presence: true, confirmation: true, length: { in: 8..15 }
  validates :is_owner, inclusion: { in: [true, false] }

  def self.authenticate_with_credentials(email, password)
    email = email.downcase.strip
    user = User.find_by(email: email)

    user && user.authenticate(password) ? user : nil
  end
end
