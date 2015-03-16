class AddCdnUrlToPackage < ActiveRecord::Migration
  def change
    add_column :packages, :cdn_url, :string
  end
end
