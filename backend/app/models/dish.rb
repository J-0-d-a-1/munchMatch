class Dish < ApplicationRecord
  belongs_to :restaurant
  has_one_attached :photo

  validates :name, presence: true
  validates :description, presence: true
  validates :price_in_cents, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
