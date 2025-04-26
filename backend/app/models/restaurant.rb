class Restaurant < ApplicationRecord
  belongs_to :category
  belongs_to :user
  has_many :dishes, dependent: :destroy
  has_one_attached :logo

  validates :name, presence: true, uniqueness: { scope: :user_id }
  validates :description, presence: true
  validates :location, presence: true
  validates :category_id, presence: true
end
