class AddShortToUsecases < ActiveRecord::Migration
  def change
    add_column :usecases, :short, :text
  end
end
