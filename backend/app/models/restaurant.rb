class Restaurant < ApplicationRecord
  belongs_to :category
  belongs_to :user
  has_many :dishes, dependent: :destroy
  has_one_attached :logo do |attachable|
    attachable.variant :thumb, resize_to_limit: [100, 100]
  end

  validates :name, presence: true, uniqueness: { scope: :user_id }
  validates :description, presence: true
  validates :location, presence: true
  validates :category_id, presence: true
  validates :logo, presence: true
end
