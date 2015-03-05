class Implementation < ActiveRecord::Base
  has_attached_file :javascript, 
    :path => :default_path,
    :url => :default_url
  has_attached_file :stylesheet, 
    :path => :default_path,
    :url => :default_url
  
  validates_attachment :javascript, 
    :content_type => {:content_type => ['application/javascript', 'application/x-javascript', 'text/javascript']},
    :file_name => {:matches => /js\Z/}
  
  validates_attachment :stylesheet, 
    :content_type => {:content_type => ['text/css']},
    :file_name => {:matches => /css\Z/}
  
  validates :library_id, :scenario_id, presence: true

  belongs_to :scenario
  belongs_to :library

  before_save :extract_javascript_content, :extract_stylesheet_content

  def javascript_path
    ActionController::Base.helpers.asset_path( javascript.url )
  end

  def stylesheet_path
    ActionController::Base.helpers.asset_path( stylesheet.url )
  end

  private
    def default_url
      '/assets/scenarios/' + self.scenario_id.to_s + '/implementations/' + self.library_id.to_s + '/:attachment/:basename:dotextension'
    end

    def default_path
      ':rails_root/public' + default_url
    end

    def extract_javascript_content
      if javascript.file?
        path = javascript.queued_for_write[:original].path
        self.javascript_content = File.open(path).read
      end
    end

    def extract_stylesheet_content
      if stylesheet.file?
        path = stylesheet.queued_for_write[:original].path
        self.stylesheet_content = File.open(path).read
      end
    end
end
