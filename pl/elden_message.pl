use strict;
use warnings;
use File::Slurp qw(read_file);

my @templates = (
	"*** ahead", 
	"Likely ***", 
	"If Only I had a ***",
	"***, O ***", 
	"Ahh, ***", 
	"No *** ahead", 
	"First off, ***",
	"Didn't expect ***", 
	"Behold, ***!", 
	"***", 
	"*** required ahead",
	"Seek ***", 
	"Visions of ***", 
	"Offer ***", 
	"***!", 
	"Be Wary of ***",
	"Still no ***", 
	"Could this be a ***?", 
	"Praise the ***", 
	"***?",
	"Try ***", 
	"Why is it always ***?", 
	"Time for ***", 
	"Let there be ***",
);

my @conjunction = (
	"and then",
	"or",
	"but",
	"therefore",
	"in short",
	"except",
	"by the way",
	"so to speak",
	"all the more",
	",",
);

my $words_ifile = "elden.txt";
my @words = read_file($words_ifile);

# Coin flip to determine if we use 1 or 2 templates for the message.
my $two_templ = int(rand(2));

# Work var setup
my @template_sel;
my @word_sel;
my $word_count = 0;

# Randomly select the templates we will use. Accounts for 1 or 2 templates.
# Also prevents templates ending with ? or ! from making it in as the first
# template if we're using 2 templates.
if($two_templ == 1) {
	my $temp_sel = "";
	do {
		$temp_sel = $templates[int(rand(@templates))];
	} while ($temp_sel =~ /[!?]/g);
	push(@template_sel, $temp_sel);
}
# Always executes. We need at least 1 template.
push(@template_sel, $templates[int(rand(@templates))]);

# Get the amount of substitutions we will need to do across all templates.
foreach (@template_sel) {
	$word_count += () = $_ =~ /\*\*\*/g;
}
# Grab the words we will use in our substitutions
for (1..$word_count) {
	push(@word_sel, $words[int(rand(@words))]);
}


foreach (@template_sel){
	# Check how many substitutions we need to do for this line.
	my $sub_count = () = $_ =~ /\*\*\*/g;
	my $word = "";

	# If we need to do more than 1 substituion on the template
	if($sub_count > 1){
		$word = shift(@word_sel);
		chomp $word;
		$_ =~ s/\*\*\*/$word/;
	}

	$word = shift(@word_sel);
	chomp $word;
	$_ =~ s/\*\*\*/$word/;
}

# Print our output. 
print $template_sel[0] . "\n";
if($two_templ == 1){
	print $conjunction[int(rand(@conjunction))] . 
		  ", " . $template_sel[1] . "\n";
}
