class CreateSwipes < ActiveRecord::Migration[7.2]
  def change
    create_table :swipes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :dish, null: false, foreign_key: true
      t.integer :right_swipes
      t.integer :left_swipes

      t.timestamps
    end
  end
end
