class Swipe < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :dish

  validates :right_swipes, numericality: { greater_than_or_equal_to: 0 }
  validates :left_swipes, numericality: { greater_than_or_equal_to: 0 }
  validates :dish_id, presence: true
end
