class Swipe < ApplicationRecord
  belongs_to :user
  belongs_to :dish

  validates :direction, inclusion: { in: %w[left right] }
end
